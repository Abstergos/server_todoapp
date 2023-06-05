import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res) => {
try {
    const { title, description } = req.body     // from the frontend(form)

    await Task.create({ title, description, user: req.user });

    res.status(201).json({
        success: true,
        message: "Task Added Successfully"
    });

} catch (error) {
    next(error);
}
}
export const getMyTask = async (req, res) => {
    const userid = req.user._id
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
        success: true,
        tasks
    })
}
export const updateTask = async (req, res,next) => {
try {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Invalid ID",404))
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success: true,
        message: "Task Updated"
    })
} catch (error) {
    next(error)
}
}
export const deleteTask = async (req, res,next) => {
try {
    const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Invalid ID",404));
    await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task Deleted"
    })
} catch (error) {
    next(error)
}
}