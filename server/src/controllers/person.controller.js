import responseHandle from "../handlers/response.handle";
import tmdbApi from "../tmdb/tmdb.api";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const person = await tmdbApi.personDetail({ personId });
    responseHandle.ok(res, person);
  } catch {
    responseHandle.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;
    const medias = await tmdbApi.personMedias({ person });
    responseHandle.ok(res, medias);
  } catch {
    responseHandle.error(res);
  }
};

export default { personDetail, personMedias };
