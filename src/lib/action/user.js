import { User } from "../models/User";
import { connnectDB } from "../mongooes/mongooes";

const findandupdatedata = async (id,
    firstName,
    lastName,
    image_url,
    email,
    userName) => {

    await connnectDB();
 try {

    const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
            $set: {
                firstName,
                lastName,
                image_url,
                email,
                userName
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
  