import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
//? kiểm tra xem người dùng đã đăng nhập
// ? Nếu người dùng đã đăng nhập, nó sẽ render nội dung của trang con (được truyền vào thông qua prop children), ngược lại nếu người dùng chưa đăng nhập, nó sẽ mở modal đăng nhập.
const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return (
    user ? children : null
  );
};

export default ProtectedPage;