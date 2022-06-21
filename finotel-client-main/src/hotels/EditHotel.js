import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { read, updateHotel } from "../actions/hotel";
import HotelEditForm from "../components/forms/HotelEditForm";


const EditHotel = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
    amenities:""
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const { title, content, price, from, to, bed, location,amenities } = values;

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);
    hotelData.append("amenities",amenities)

    try {
      let res = await updateHotel(token, hotelData, match.params.hotelId);
      toast.success(`${res.data.title} is updated`);
      setTimeout(() => {
        window.location.href ='/dashboard/seller'
      }, 500);
    } catch (err) {
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center nav-banner">
        <h2>Edit Hotel</h2>
      </div>
      <div className="wrapper">
      <div className="image-peview">
            <img
              src={preview}
              alt="preview"
              className="img img-fluid"
            />
          </div>
          <div className="form-div">
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>         
        </div>
    </>
  );
};

export default EditHotel;
