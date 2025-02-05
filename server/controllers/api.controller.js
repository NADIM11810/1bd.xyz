// dataController.js



export const fetchData = async (req, res) => {
  const { nid, dob } = req.query;


  res.send("Hello to online API", { nid, dob });


};
