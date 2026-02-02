import mongoose, { Types } from "mongoose";

export interface IApplication {
  addressApplication?: string;
  nameCompany?: string;
  telSalon?: string;
  telManager?: string;
  telClient?: string;
  telForeman?: string;
  dateRegistration?: string;
  nameClient?: string;
  price?: string;
  numberApplication?: number;
}

export interface IApartment extends Document {
  dataApplication: IApplication;
  owner: Types.ObjectId;
  rooms: Types.ObjectId[];
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new mongoose.Schema<IApplication>(
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
  { _id: false },
);

const apartmentSchema = new mongoose.Schema<IApartment>(
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
  { timestamps: true },
);

// apartmentSchema.pre("save", function (next) {
//   this.updateAt = Date.now();
//   next();
// });

export default mongoose.model<IApartment>("Apartment", apartmentSchema);
