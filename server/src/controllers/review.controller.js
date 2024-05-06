import responseHandle from "../handlers/response.handle.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });
    await review.save();
    responseHandle.ok(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandle.error(res);
  }
};

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandle.notfound(res);

    await review.remove();
  } catch {
    responseHandle.error(res);
  }
};

const getReviewOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      user: req.user.id,
    }).sort('-createdAt');
    responseHandle.ok(res, reviews)
  } catch {
    responseHandle.error(res);
  }
};

export default { create, remove, getReviewOfUser };
