import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const UserRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.send("all fields are mandatory");
      return;
    }
    const availableUser = await UserModel.findOne({ email });
    if (availableUser) {
      res.send("user already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (user) {
      res.json({ user, status: true });
      console.log(user);
    } else {
      res.send("user data is not valid");
    }
  } catch (err) {
    res.send("error: " + err);
  }
};

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      res.send("all field is required");
    }
    const user = await UserModel.findOne({ email });
    console.log(user, "useeeer");
    if (user && (await bcrypt.compare(password, user.password))) {
      const accesstoken = Jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET
        // { expiresIn:  }
      );
      res.json({ accesstoken, user, status: true });
    } else {
      res.send("email or password not valid");
    }
  } catch (err) {
    res.send("error" + err);
  }
};
const userGet = async (req, res) => {
  try {
    res.send("user get");
  } catch (err) {
    res.send("errr" + err);
  }
};


const addAddress = async (req, res) => {
  try {
    const { userId, name, mobileNumber, address, pincode, locality, state } = req.body;
    console.log(req.body, 'reqqq body');

    if (!userId || !name || !mobileNumber || !address || !pincode || !locality || !state) {
      // console.log('Fields are missing:', { userId, name, mobileNumber, address, pincode, locality, state });
      res.send('all fields are mandatory');
      return;
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      res.send('user not found');
      return;
    }

    if (user.address.length >= 3) {
      console.log('User has reached the maximum limit of addresses');
      res.send('user has reached the maximum limit of addresses');
      return;
    }

    console.log('All fields are present:', { userId, name, mobileNumber, address, pincode, locality, state });
    const newAddress = {
      name,
      mobileNumber,
      address,
      pincode,
      locality,
      state
    };

    console.log('New address:', newAddress);

    user.address.push(newAddress);
    await user.save();
    res.json({ user, status: true });

  } catch (error) {
    res.send('error' + error);
  }
};

const addressGet = async (req, res) => {
  try {
    const userId = req.params.id; 

    const user = await UserModel.findById(userId);
    if (!user) {
      res.send("User not found");
      return;
    }

    const addresses = user.address;
    console.log(addresses);
    res.json({ addresses });
  } catch (err) {
    res.send("Error: " + err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.query;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.send('user not found');
      return;
    }

    const addressIndex = user.address.findIndex((address) => address._id.toString() === addressId);
    if (!addressIndex ) {
      res.send('address not found');
      return;
    }
    user.address.splice(addressIndex, 1);
    await user.save();
    res.send('address deleted successfully');
  } catch (error) {
    res.send('error: ' + error);
  }
};




export default { UserLogin, UserRegister, userGet,addAddress,addressGet,deleteAddress };
