import AlgoliaPlaces from "algolia-places-react";
import { Checkbox, DatePicker, Select } from "antd";
import moment from "moment";

import { AMENITIES, BEDS, DATE_YMD } from "../../constants";

const { Option } = Select;



const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, content, location, price, bed, from, to, amenities } = values;
  let amenitiesString = amenities ? amenities.split(",") : []
    
     

  function onChange(checkedValues) {
    setValues({ ...values, amenities: checkedValues.toString()})
  }

  return (
    <>
    { title && 
    <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        {location && location.length && (
          <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Location"
            defaultValue={location}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="one day price per room"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of rooms"
          value={bed}
        >
         
          {BEDS.map((bed) => (
            <Option key={bed}>{bed}</Option>
          ))}
        </Select>
      </div>

      {from && (
        <DatePicker
          defaultValue={moment(from, DATE_YMD)}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

      {to && (
        <DatePicker
          defaultValue={moment(to, DATE_YMD)}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

<Checkbox.Group options={AMENITIES} defaultValue={[...amenitiesString]} onChange={onChange} className="m-2" />

      <button className="btn btn-outline-primary m-2">Update</button>
    </form> 
}
    </>  
  );
};

export default HotelEditForm;
