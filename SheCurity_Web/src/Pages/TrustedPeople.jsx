import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaUserCircle } from 'react-icons/fa';

const trustedContacts = [
    { id: '1', name: 'Mom', phone: '1234567890' },
    { id: '2', name: 'Dad', phone: '0987654321' },
    { id: '3', name: 'Brother', phone: '1122334455' },
    { id: '4', name: 'Sister', phone: '1122334455' },
];

export default function TrustedPeopleScreen() {
    const handleCall = (phoneNumber) => {
        window.open(`tel:${phoneNumber}`, '_self');
    };

    return (
        <Container fluid className="mt-4 d-flex flex-column align-items-center" style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <h2 className="text-center    text mb-4">Trusted People</h2>
            <style>
    {`
        .text {
            background: linear-gradient(135deg, rgb(74, 6, 133), rgb(132, 74, 172), rgb(74, 6, 133));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
        }
    `}
</style>
            <Row className="g-3 justify-content-center" style={{ width: '90%' }}>
                {trustedContacts.map((contact) => (
                    <Col key={contact.id} xs={12} md={6} className="d-flex justify-content-center">
                        <Card className="mb-3 shadow-sm w-100">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                
                                <FaUserCircle size={50} color="#7b539d" />
                                
                               
                                <div className="flex-grow-1 ms-3">
                                    <Card.Title className="mb-1">{contact.name}</Card.Title>
                                    <Card.Text className="text-muted">{contact.phone}</Card.Text>
                                </div>

                               
                                <Button  className="rounded-circle p-2 gradient-icon-btn" onClick={() => handleCall(contact.phone)}>
                                    <FaPhone size={20} color="#d8598c" />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
