import express from "express";
import { 
    getUserById,
    getPatientByUser,
    getPatientById,
    getAppointmentsByUser
} from "./database.js";
import cors from "cors";

const corsOptions = {
    origin: "http://192.168.128.30:8080",
    methods: ["POST", "GET"],
    credentials: true,

}

const app = express();

app.use(express.json());
app.use(cors(corsOptions));


app.get("/user/:id", async (req, res) => {
    const infoUser = await getUserById(req.params.id);
    if(res)
    {
        res.status(200).json(infoUser);
    }else{
        res.status(404).json({message: "User not found"});
    }
    // res.status(200).send(infoUser);
})

app.get("/user/appointments/:id", async (req, res) => {
    const infoUser = await getUserById(req.params.id);
    const userAppointments = await getAppointmentsByUser(infoUser.id);
    console.log(infoUser);
    res.status(200).send({ infoUser, userAppointments });
})

app.listen(8080, () => {
    console.log("Server running on port 8080")
});

