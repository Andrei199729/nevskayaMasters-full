import mongoose from "mongoose";

export enum StateElement {
  Ventilation = "ventilation",
  Door = "elementDoor",
  Window = "elementWindow",
  Socket = "elementSocket",
  Battery = "elementBattery",
}

export type TStateElement =
  | StateElement.Ventilation
  | StateElement.Door
  | StateElement.Window
  | StateElement.Socket
  | StateElement.Battery;

export interface IDataItem {
  id: string;
  name: string;
}

export interface IExternalSizeWall {
  id: number;
  widthTop?: string;
  widthBottom?: string;
  heightRight?: string;
  heightLeft?: string;
  radiusWall?: string;
  valueDegree?: string;
  wallAngleDegree?: string;
}

export interface ISaveSizeWall {
  [key: number]: {
    size: IExternalSizeWall; // Здесь описано, что каждый элемент по индексу содержит объект с `size`
    numberWall: number;
  };
}

export interface IDataElementsWall {
  id: number;
  nameElement: string;
  stateElement: string;
}

export interface IElementWall {
  numberElement?: number;
  data: IElementData;
  dataObj: IDataElementsWall;
}

interface IElementDataObj {
  nameElement: string;
  stateElement: string;
  id: number;
}

export interface IElementData {
  nameElementWall: string;
  heightRight: string;
  widthTop: string;
  widthBottom: string;
  heightLeft: string;
  radiusElement: string;
  locationElementTop: string;
  locationElementRight: string;
  locationElementLeft: string;
  locationElementBottom: string;
}

export interface IElement {
  data: IElementData;
  dataObj: IElementDataObj;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IWallSize {
  id: number;
  heightRight: string;
  heightLeft: string;
  widthTop: string;
  widthBottom: string;
  wallAngleDegree?: string;
  radiusWall?: string;
  valueDegree?: string;
  arrElements?: {
    elements?: IElement[];
  };
}

export interface IShape {
  id: number;
  path: string;
  length: number;
  points: IPoint[];
}

export interface IWall {
  size: IWallSize;
  numberWall: number;
}

export interface IDrawingData {
  numberWall: number;
  countWallDraw: number;
  shapes: IShape[];
  walls: IWall[];
}

export interface IDrawing {
  drawingData: IDrawingData;
}

export interface IProductRoom {
  dataProduct: IDrawing[];
  nameRoom: string;
  owner: mongoose.Types.ObjectId;
  createdAt: string;
  _id: string;
}

const PointSchema = new mongoose.Schema(
  {
    x: Number,
    y: Number,
  },
  { _id: false },
);

const ShapsSchema = new mongoose.Schema(
  {
    id: Number,
    path: String,
    length: Number,
    points: [PointSchema],
  },
  { _id: false },
);

const ElementDataSchema = new mongoose.Schema(
  {
    nameElementWall: { type: String, required: false },
    locationElementTop: { type: String, required: false },
    locationElementRight: { type: String, required: false },
    locationElementLeft: { type: String, required: false },
    locationElementBottom: { type: String, required: false },
    widthTop: { type: String, required: false },
    widthBottom: { type: String, required: false },
    heightLeft: { type: String, required: false },
    heightRight: { type: String, required: false },
    radiusElement: { type: String, required: false },
  },
  { _id: false },
);

const ElementDataObjSchema = new mongoose.Schema(
  {
    nameElement: String,
    stateElement: String,
    id: Number,
  },
  { _id: false },
);

const ElementSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    data: ElementDataSchema,
    dataObj: ElementDataObjSchema,
  },
  { _id: false },
);

const SizeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    heightRight: String,
    heightLeft: String,
    widthTop: String,
    widthBottom: String,
    wallAngleDegree: String,
    radiusWall: String,
    valueDegree: String,
    arrElements: {
      elements: [ElementSchema],
    },
  },
  // { _id: false }
);

const WallSchema = new mongoose.Schema(
  {
    size: SizeSchema,
    numberWall: Number,
  },
  { _id: false },
);

export const DrawingDataSchema = new mongoose.Schema(
  {
    numberWall: Number,
    countWallDraw: Number,
    shapes: [ShapsSchema],
    walls: [WallSchema],
  },
  { _id: false },
);

const DataProductSchema = new mongoose.Schema(
  {
    drawingData: DrawingDataSchema,
  },
  { _id: false },
);

const productSchema = new mongoose.Schema({
  nameRoom: { type: String, required: true },
  dataProduct: [DataProductSchema],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProductRoom>("product", productSchema);
