import Bannermodel from "../../models/bannermodels/Bannermodel";


// create
export const BannerControlsget = async (req, res) => {

    const { userId, image } = req.body;
    try {
        const datas = new Bannermodel({
            userId: userId,
            image: req.file.path
        })

        await datas.save();
        res.status(201).json(datas);

    }
    catch (err) {
        console.log(err);
        res.status(404).json("Something Wrong!!!")

    }
}



// get banners

export const BannerGetAll = async (req, res) => {


    try {

        const datas = await Bannermodel.find({ userId: req?.params?.id });

        res.status(200).json(datas);

    }
    catch (err) {
        console.log(err);
        res.status(404).json("Something Wrong!!!")

    }
}


// edit banners


export const BannerEdit = async (req, res) => {

    try {
        const datas = await Bannermodel.findByIdAndUpdate(req.params?.id, {
            userId: userId,
            image: req.file.path
        }, { new: true });

        res.status(200).json("Updated..");

    }
    catch (err) {
        console.log(err);
        res.status(404).json("Something Wrong!!!")

    }
}

// delete



export const BannerDelete = async (req, res) => {

    try {
        const datas = await Bannermodel.findByIdAndDelete(req.params?.id);

        res.status(200).json("Deleted..");

    }
    catch (err) {
       
        res.status(404).json("Something Wrong!!!")

    }
}