const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        feePerConsultation: {
            type: Number,
            required: true,
        },
        timings: {
            type: Array,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
        patients: {
            type: Array,
            default: []
        },
        practitionerId: {
            type: String
        },
        practitionerRoleId: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;