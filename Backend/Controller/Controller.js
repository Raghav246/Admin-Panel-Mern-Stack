const User = require("../Model/Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    const data = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const jwttoken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    if (user) {
      return res
        .status(200)
        .json({
          status: true,
          message: "Logged In Successfully",
          data: user,
          token: jwttoken,
        });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const aggregationArray = [];

    if (search) {
      aggregationArray.push({
        $match: {
          $or: [
            { email: { $regex: search, $options: "i" } },
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        },
      });
    }

    aggregationArray.push({
      $facet: {
        paginationData: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    });

    const data = await User.aggregate(aggregationArray);
    const paginationData = data[0].paginationData;
    const totalCount = data[0].totalCount[0] ? data[0].totalCount[0].count : 0;

    return res.status(200).json({
      data: paginationData,
      totalCount: totalCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
if (!user) {
      return res.status(404).json({ message: 'User not found'});
    }
    else
return res.status(200).json({status:true,data:user});
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = Number(req.params);
  const updatedData = req.body;
  try {
    const item = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    } else return res.status(200).json({"status":true,data:item});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ status: true, message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

