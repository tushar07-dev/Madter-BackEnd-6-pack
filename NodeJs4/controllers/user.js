import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        users,
    });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name, email, password,
    })
    res.status(201).cookie("tempo", "LOL").json(
        {
            success: true,
            message: "Registrated Sucessfully"
        }
    );
};

export const specialFunctions = (req, res) => {
    res.json({
        success: true,
        message: "Just Kidding",
    })
};

export const getUserDetail = async (req, res) => {
    const {id} = req.params;
    const user =  await User.findById(id);

    res.json({
        success: true,
        user,
    });
};

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const user =  await User.findById(id);

    res.json({
        success: true,
        message: 'User Updated successfully',
    });
};

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user =  await User.findById(id);

    res.json({
        success: true,
        message: 'User deleted successfully',
    });
};