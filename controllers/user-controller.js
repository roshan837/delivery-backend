import User from "../model/User.js";

export const submit = async (req, res) => {
  try {
    const { pickup, drop, number, name } = req.body;

    // Create a new form data document
    const formData = new User({
      pickup,
      drop,
      number,
      name,
    });

    // Save the form data to the database
    await formData.save();

    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit form" });
  }
};
