import { Container, Row, Col, Button, Image } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="bg-light text-center py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="display-4">Swift & Reliable Digital Transactions</h1>
                        <p className="lead">Transform your payments with PayEZ – fast, secure, and efficient.</p>
                        <ul className="list-unstyled">
                            <li>Seamless integration with any platform or device</li>
                            <li>Support for global payments in diverse currencies</li>
                            <li>Comprehensive real-time analytics and monitoring</li>
                        </ul>

                        <div className="button-container" style={{ textAlign: "center", marginTop: "20px" }}>
                            <a href="/login" className="btn btn-primary btn-lg" style={{ marginRight: "10px" }}>Login</a>
                            <a href="/signup" className="btn btn-secondary btn-lg">Signup</a>
                        </div>
                    </Col>

                    <Col md={6}>
                        <Image
                            src="https://th.bing.com/th/id/R.bcf7a87a1eb1a269a23ea5be133b5165?rik=RzQHlhG%2fOIqZgg&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcash-icon-transparent%2fcash-icon-transparent-19.png&ehk=m6L%2f7%2fmq04RcBif8CszJzPJhpSZyjIo8fHwVN8s49fM%3d&risl=&pid=ImgRaw&r=0"
                            alt="Online payment Illustration"
                            fluid
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
