import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// WHEN UPDATING ALSO CHANGE client/src/index.js
// Imports DROP-DOWN menu to be rendered in categories selection
// Update to use another framework different from Bootstrap
import Dropdown from 'react-bootstrap/Dropdown';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  // ON REFACTORING REMOVE COMMENTED SECTION AFTER UPDATES APPROVED ! ! !
  // return (
  //   <div>
  //     <h2>Choose a Category:</h2>
  //     {categories.map((item) => (
  //       <button
  //         key={item._id}
  //         onClick={() => {
  //           handleClick(item._id);
  //         }}
  //       >
  //         {item.name}
  //       </button>
  //     ))}
  //   </div>
  // );

  // CREATES A CATEGOTY DROP-DOWN MENU USING BOOTSTRAP.
  // IT MUST BE UPDATED TO USE ANOTHER FRAMEWORK. KEEP BOOTSTRAP AS PLACEHOLDER UNTIL UPDATES ARE IMPLEMENTED
  return (
    <div>
      <h2>Choose a Category:</h2>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Choose a category:
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {categories.map((item) => (
        <Dropdown.Item
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </Dropdown.Item>
      ))}
      </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default CategoryMenu;
