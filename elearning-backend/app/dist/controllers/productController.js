"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProductbyId = exports.getProductById = exports.getAllProducts = exports.addProduct = void 0;
const models_1 = __importDefault(require("../models/"));
// Whatever you want im just gonna use product for now;
const Product = models_1.default.products;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        yield Product.create(product);
        return res.status(200).json({ message: 'added' });
    }
    catch (error) {
        return res.status(403).json({ message: error.message || 'Something went wrong!' });
    }
});
exports.addProduct = addProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Product.findAll();
        return res.status(200).json(allProducts);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || 'Something broke up!'
        });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const productById = yield Product.findByPk(id);
        if (productById) {
            return res.status(200).json(productById);
        }
        else {
            res.status(404).json({ message: `Cannot find product with ${id}` });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message || `Error while trying to retrieve product with` + id });
    }
});
exports.getProductById = getProductById;
const deleteProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield Product.destroy({
            where: {
                id: id
            }
        });
        return res.status(200).json({ message: 'Product was deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message || `Something went wrong while deleting!` });
    }
});
exports.deleteProductbyId = deleteProductbyId;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = {
        title: req.body.title
    };
    try {
        yield Product.update(product, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Updated product" });
    }
    catch (error) {
        return res.status(403).json({ message: "Failed trying to update product" });
    }
});
exports.updateProduct = updateProduct;
