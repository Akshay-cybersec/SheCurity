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
            <h2 className="text-center mb-4">Trusted People</h2>
            <Row className="g-3 justify-content-center" style={{ width: '90%' }}>
                {trustedContacts.map((contact) => (
                    <Col key={contact.id} xs={12} md={6} className="d-flex justify-content-center">
                        <Card className="mb-3 shadow-sm w-100">
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                {/* Avatar Icon */}
                                <FaUserCircle size={50} color="#d8598c" />
                                
                                {/* Contact Info */}
                                <div className="flex-grow-1 ms-3">
                                    <Card.Title className="mb-1">{contact.name}</Card.Title>
                                    <Card.Text className="text-muted">{contact.phone}</Card.Text>
                                </div>

                                {/* Call Button */}
                                <Button  className="rounded-circle p-2" onClick={() => handleCall(contact.phone)}>
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
