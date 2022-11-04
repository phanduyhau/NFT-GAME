import React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { createProduct, editProduct, listProducts } from "./Product/Product";
import { createUser, editUser, listUsers } from "./User/Users";
import { editBlog, listBlogs } from "./Blogs/Blogs";
import myDataProvider from "./dataProvider";

function AdminGame() {
  return (
    <>
      <Admin dataProvider={myDataProvider}>
        <Resource
          name="products"
          list={listProducts}
          edit={editProduct}
          create={createProduct}
        />
        <Resource
          name="users"
          list={listUsers}
          edit={editUser}
          create={createUser}
          show
        />
        <Resource name="blogs" list={listBlogs} edit={editBlog} />
      </Admin>
    </>
  );
}

export default AdminGame;
