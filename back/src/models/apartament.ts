import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    addressApplication: String,
    nameCompany: String,
    telSalon: String,
    telManager: String,
    telClient: String,
    telForeman: String,
    dateRegistration: String,
    nameClient: String,
    price: String,
    numberApplication: Number,
  },
  { _id: false }
);

const apartamentSchema = new mongoose.Schema(
  {
    dataApplication: { type: ApplicationSchema, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    // status: ["draft", "active", "completed", "archived"],
    // default: "draft",
    isDraft: {
      type: Boolean,
      default: true, // по умолчанию шаблонная заявка
    },
  },
  { timestamps: true }
);

// apartamentSchema.pre("save", function (next) {
//   this.updateAt = Date.now();
//   next();
// });

export default mongoose.model<any>("apartament", apartamentSchema);
