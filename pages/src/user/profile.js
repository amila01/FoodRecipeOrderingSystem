import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { parseCookies } from "nookies";
import { loadUser } from "../../../redux/userAction";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../../redux/store1";
import axios from "axios";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

import Image from "next/image";
import styles from "../../../styles/admin.module.css";
// import AddButton from "../../components/AddButton";
// import Add from "../../components/Add";
import Table from "react-bootstrap/Table";
import { Button, Stack, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

const Profile = ({ orders, products }) => {
  const [foodList, setFoodList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "deliverd"];
  const [close, setClose] = useState(true);

  const profile = useSelector((state) => state.profile);
  const { loading, error, dbUser } = profile;

  console.log("profile", dbUser);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/products/" + id
      );
      setFoodList(foodList.filter((food) => food._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Stack direction="horizontal" gap={3}>
        
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/img/img.png" />
            <Card.Body>
            {dbUser && (
               <Card.Title>{dbUser.name}</Card.Title> 
              )}
              <div style={{ color: "orange" }}>
                {" "}
                <FaStar />
                <FaStar /> <FaStar /> <FaStar />
                <FaStar />{" "}
              </div>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                {/* {<AddButton setClose={setClose}/>}
                                  {!close && <Add setClose={setClose}/>} */}
                <Button variant="outline-danger mx-2">Add new Recipe</Button>
              </ListGroupItem>
              <ListGroupItem>
                <Button variant="outline-success mx-2">My Orders</Button>
              </ListGroupItem>
              <ListGroupItem>
                <Button variant="outline-info mx-2">Add Status</Button>
              </ListGroupItem>
            </ListGroup>
          </Card>

      {dbUser && (
       <Stack gap={1}>
          <Col>
            <h1 className={styles.title}>My Products</h1>
            <Table className={styles.table} striped bordered hover>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Image</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              {foodList
                .filter((product) => product.authId == dbUser._id)
                .map((product) => (
                  <tbody key={product._id}>
                    <tr className={styles.trTitle}>
                      <td>
                        <Image
                          src={product.img}
                          width={50}
                          height={50}
                          objectFit="cover"
                          alt=""
                        />
                      </td>
                      <td>{product._id.slice(0, 5)}...</td>
                      <td>{product.title}</td>
                      <td>LKR.1000</td>
                      <td>
                        <Button variant="outline-success mx-2" size="sm">
                          edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleDelete(product._id)}
                          size="sm"
                        >
                          delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>

          <Col>
            <h1 className={styles.title}>My Picks</h1>
            <Table striped bordered hover>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              {orderList
                .filter((order) => order.cusId == dbUser._id)
                .map((order) => (
                  <tbody key={order._id}>
                    <tr className={styles.trTitle}>
                      <td>{order._id.slice(0, 5)}...</td>
                      <td>{order.customer}</td>
                      <td>LKR{order.total}.00</td>
                      <td>
                        {order.method === 0 ? (
                          <span>cash</span>
                        ) : (
                          <span>paid</span>
                        )}
                      </td>
                      <td>{status[order.status]}</td>
                      <td>
                        {[order.proIds].map((proId) => (
                          <Link href={`/product/${proId}`} key={order._id}>
                            <Button variant="outline-primary mx-2" size="sm">
                              {proId}
                            </Button>
                          </Link>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
          <Col>
            <h1 className={styles.title}>My orders</h1>
            <Table striped bordered hover>
              <thead>
                <tr className={styles.trTitle}>
                  <th>Id</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              {orderList
                .filter((order) => order.cusId !== dbUser._id)
                .map((order) =>
                  [order.authIds]
                    .filter((authId) => authId == dbUser._id)
                    .map((authid) => (
                      <tbody key={order._id}>
                        <tr className={styles.trTitle}>
                          <td>{order._id.slice(0, 5)}...</td>
                          <td>{order.customer}</td>
                          <td>LKR{order.total}.00</td>
                          <td>
                            {order.method === 0 ? (
                              <span>cash</span>
                            ) : (
                              <span>paid</span>
                            )}
                          </td>
                          <td>{status[order.status]}</td>
                          <td>
                            <Button
                              variant="outline-primary mx-2"
                              size="sm"
                              onClick={() => handleStatus(order._id)}
                            >
                              next stage
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))
                )}
            </Table>
          </Col>
          </Stack>
      )}
      </Stack>
    </Container>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });
      const cookies = parseCookies();

      const user = cookies?.user ? JSON.parse(cookies.user) : session?.user;

      await store.dispatch(loadUser(user?.email, user));

      const productRes = await axios.get("http://localhost:3000/api/products");
      const orderRes = await axios.get("http://localhost:3000/api/orders");

      return {
        props: {
          session,
          orders: orderRes.data,
          products: productRes.data,
        },
      };
    }
);

export default Profile;
