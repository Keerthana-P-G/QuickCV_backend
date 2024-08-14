const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');
const pdf = require('html-pdf');
// const path = require('path');
const PersonalDetail = require('./models/PersonalDetails');
const Education = require('./models/Education');
const Internship = require('./models/Internship');
const Project = require('./models/Project');
const Skill = require('./models/Skills');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://user1:root1@cluster0.zfcen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/per', async (req, res) => {
  try {
    const personal = new PersonalDetail(req.body);
    await personal.save();
    res.status(201).send(personal);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/edu', async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    await newEducation.save();
    res.send("Education saved");
  } catch (err) {
    console.log(err);
  }
});

app.post('/intern', async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).send(internship);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/intern', async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).send('Error fetching internship details');
  }
});

app.post('/intern', async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).send(internship);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/intern/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInternship = await Internship.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInternship) return res.status(404).send('Internship not found');
    res.send(updatedInternship);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/intern/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInternship = await Internship.findByIdAndDelete(id);
    if (!deletedInternship) return res.status(404).send('Internship not found');
    res.send(deletedInternship);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/project', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send('Error fetching project details');
  }
});

app.post('/project', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.put('/project/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).send('Project not found');
    }
    res.send(updatedProject);
  } catch (err) {
    res.status(400).send(err.message || 'Error updating project');
  }
});

app.delete('/project/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).send('Project not found');
    res.send(deletedProject);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/skills', async (req, res) => {
  try {
    const payload = new Skill(req.body);
    await payload.save();
    res.status(201).send(payload);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const generateResumeHTML = async () => {
  const personal = await PersonalDetail.findOne({});
  const education = await Education.find({});
  const internships = await Internship.find({});
  const projects = await Project.find({});
  const skills = await Skill.findOne({});

  return `
    <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 900px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { font-size: 3em; color: #2c3e50; margin-bottom: 10px; }
          .header p { font-size: 1.2em; color: #555; margin: 2px 0; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 2em; color: #2c3e50; border-bottom: 3px solid #2980b9; padding-bottom: 10px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
          .section-content { margin-left: 15px; font-size: 1.2em; }
          .section-content p { margin: 8px 0; line-height: 1.5; }
          .section-content span { display: block; color: #888; font-size: 1em; margin-top: 3px; }
          .skill-list, .interest-list { list-style-type: none; padding: 0; margin: 0; }
          .skill-list li, .interest-list li { display: inline-block; margin: 5px 10px 5px 0; padding: 8px 15px; background-color: #2980b9; color: #fff; border-radius: 5px; font-size: 1em; }
          .skill-list li:hover, .interest-list li:hover { background-color: #3498db; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${personal.firstName} ${personal.lastName}</h1>
            <p>Email: ${personal.email} | Phone: ${personal.phone}</p>
            <p>GitHub: ${personal.github} | LinkedIn: ${personal.linkedin}</p>
          </div>
          
          <div class="section">
            <div class="section-title">Education</div>
            <div class="section-content">
              ${education.map(edu => `
                <p><strong>${edu.Degree}</strong> in ${edu.FieldOfStudy} <span>@ ${edu.CollegeName}, ${edu.SchoolEducation} (${edu.GraduationMonth} ${edu.GraduationYear})</span></p>
                <p>GPA: ${edu.Gpa}</p>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Internships</div>
            <div class="section-content">
              ${internships.map(intern => `
                <p><strong>${intern.companyName}</strong>, ${intern.location}</p>
                <p>Topic: ${intern.topic} (${intern.fromDate} - ${intern.toDate})</p>
              `).join('')}
            </div>
          </div>
  
          <div class="section">
            <div class="section-title">Projects</div>
            <div class="section-content">
              ${projects.map(proj => `
                <p><strong>${proj.projectName}</strong></p>
                <p>Tools Used: ${proj.toolsUsed}</p>
                <p>Description: ${proj.description}</p>
              `).join('')}
            </div>
          </div>
  
          <div class="section">
            <div class="section-title">Skills & Interests</div>
            <div class="section-content">
              <p><strong>Skills:</strong></p>
              <ul class="skill-list">
                ${skills.skills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
              <p><strong>Interests:</strong></p>
              <ul class="interest-list">
                ${skills.interests.map(interest => `<li>${interest}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};


app.get('/api/resume/download', async (req, res) => {
  try {
    const resumeHTML = await generateResumeHTML();
    pdf.create(resumeHTML).toStream((err, stream) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.setHeader('Content-type', 'application/pdf');
      stream.pipe(res);
    });

    await PersonalDetail.deleteMany({});
    await Education.deleteMany({});
    await Internship.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
  } catch (err) {
    res.status(500).send('Failed to generate resume');
  }
});

app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});