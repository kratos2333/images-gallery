import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Search = () => {
    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <Form>
                        <Form.Row>
                            <Col xs={9}>
                                <Form.Control type="email" placeholder="Search for new image..."/>
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">Search</Button>
                            </Col>
                        </Form.Row>
                    </Form></Col>
            </Row>
        </Container>
    )
};

export default Search