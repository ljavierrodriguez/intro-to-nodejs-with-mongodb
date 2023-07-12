const { default: mongoose } = require("mongoose");
const Dispatch = require("../models/dispatch")

exports.listDispatch = async (req, res) => {
    try {
        const { page = 1 } = req.query;

        const LIMIT = 20;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await Dispatch.countDocuments({});

        const dispatches = await Dispatch.find().sort({ _id: 1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({
            data: dispatches,
            currentPage: Number(page),
            numbersOfPages: Math.ceil(total / LIMIT)
        });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
exports.storeDispatch = async (req, res) => {
    try {
        //const { invoices_id, client, amount, weight, date_dispatch, method, users_id, office } = req.body;
        const dispatch = req.body;

        const newDispatch = new Dispatch({ ...dispatch, created_at: new Date().toISOString() });

        await newDispatch.save();

        res.status(201).json({
            data: newDispatch,
            status: 201,
            message: 'Despacho creado satisfactoriamente.'
        });

    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}
exports.updateDispatch = async (req, res) => {
    const { id: _id } = req.params;
    const dispatch = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(409).json({ status: 404, message: 'No es un id valido' });
    
    const dispatchFound = await Dispatch.findById({ _id });
    
    if(!dispatchFound) return res.status(404).json({ status: 404, message: 'El Despacho no existe' });
    
    try {
        const updateDispatch = await Dispatch.findByIdAndUpdate(_id, {...dispatch, _id }, { new: true });

        res.status(200).json({
            data: updateDispatch,
            status: 200,
            message: 'Despacho actualizado satisfactoriamente.'
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
exports.deleteDispatch = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(409).json({ status: 404, message: 'No es un id valido' });
    
    const dispatchFound = await Dispatch.findById({ id });
    
    if(!dispatchFound) return res.status(404).json({ status: 404, message: 'El Despacho no existe' });
    
    try {
        await Dispatch.findByIdAndRemove(id);

    } catch (error) {
        
    }
}