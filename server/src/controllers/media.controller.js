import responseHandle from "../handlers/response.handle";
import tmdbApi from "./../tmdb/tmdb.api";
import userModel from "../models/user.model";
import favoriteModel from "../models/favorite.model";
import reviewModel from "../models/review.model";
import tokenMiddlerware from "../middlewares/token.middleware";

const getList = async (req, res) => {
  try {
    const { page } = req.query; //?được sử dụng để truy cập các tham số truy vấn được gửi trong URL.
    const { mediaType, mediaCategory } = req.params; //? dược sử dụng để truy cập các tham số đường dẫn được định nghĩa trong URL.

    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandle.ok(res, response);
  } catch {
    responseHandle.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = res.params;
    const response = await tmdbApi.mediaGenres({ mediaType });
    return responseHandle.ok(res, response);
  } catch {
    responseHandle.error(res);
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = res.params;
    const { query, page } = res.query;

    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: mediaType === "people" ? "person" : mediaType,
    });

    responseHandle.ok(res, response);
  } catch {
    responseHandle.error(res);
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = res.params;

    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    //? Cách 1 cập nhập đối tượng
    media.credits = await tmdbApi.mediaCredits(params); //? gán 1 thuộc tính  credits cho đối tượng media (sử dụng media.credits)

    //? Cách 2 cập nhập đối tượng
    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);

    //? Sử dụng ID của người dùng từ token để tìm kiếm thông tin người dùng trong cơ sở dữ liệu.
    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          media,
        });
        media.isFavorite = isFavorite !== null;
      }
    }
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createAt");
    responseHandle.ok(res, media);
  } catch {
    responseHandle.error(res);
  }
};

export default { getList, getGenres, search, getDetail };
