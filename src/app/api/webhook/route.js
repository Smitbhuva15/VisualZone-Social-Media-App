import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
import { deleteUser, findandupdatedata } from '@/lib/action/user';

export async function POST(req) {

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }


    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)


    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }


    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt?.type;

    if (eventType === "user.created" || eventType === "user.updated") {
        const { id, first_name, last_name, image_url, email_addresses, username } =
            evt?.data;

        try {
            await findandupdatedata(
                {
                    id: id
                    , firstName: first_name
                    , lastName: last_name
                    , image_url: image_url
                    , email: email_addresses
                    , userName: username
                }
            )

            return NextResponse.json({ message: "user created successFully" }, { status: 200 })


        } catch (error) {
            console.error("Error creating or updating user:", err);
            return NextResponse.json({ message: "user not created" }, { status: 500 })
        }
    }

    if (eventType === "user.deleted") {
        const { id } = evt?.data;

        try {
            await deleteUser(id)

            return NextResponse.json({ message: "user deleted successFully" }, { status: 200 })


        } catch (error) {
            console.error("Error deleting user:", err);

            return NextResponse.json({ message: "user not deleted" }, { status: 500 })
        }
    }
}