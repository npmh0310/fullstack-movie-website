import responseHandle from "../handlers/response.handle.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandle.ok(res, isFavorite);

    const favorite = await favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();
    responseHandle.created(res, favorite);
  } catch {
    responseHandle.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = res.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });
    if (!favorite) return responseHandle.notfound(res);
    await favorite.remove();
    responseHandle.ok(res);
  } catch {
    responseHandle.error(res);
  }
};

const getFavoriteOfUser = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");
    responseHandle.ok(res, favorite);
  } catch {
    responseHandle.error(res);
  }
};

export default { addFavorite, removeFavorite, getFavoriteOfUser };
