const modelOptions = {
    //  xử lý khi chuyển đổi đối tượng model thành JSON hoặc một đối tượng JavaScript thông thường, bao gồm việc loại bỏ trường _id khỏi đối tượng.
  toJON: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false, // __v được loại bỏ
  timestamps: true, // tạo createdAt  và updatedAt
};

export default modelOptions;
