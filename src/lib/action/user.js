import { User } from "../models/User";
import { connnectDB } from "../mongooes/mongooes";

export const findandupdatedata = async (id,
    first_name,
    last_name,
    image_url,
    email_addresses,
    username) => {

    await connnectDB();
 try {

    const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
            $set: {
                firstName:first_name,
                lastName:last_name,
                image_url:image_url,
                email: email_addresses,
                userName:username
            }
        },
        { upsert: true, new: true }
    )

    await User.save();
    return user;
    
 } catch (error) {
    console.log("error is found")
 }

}

export const deleteUser = async (id) => {
    try {
      await connnectDB();
      await User.findOneAndDelete({ clerkId: id });
    } catch (error) {
      console.error(error);
    }
  };
  