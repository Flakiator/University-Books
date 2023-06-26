import Card from "react-bootstrap/Card";

export function Book(props){
    return(
        <div>
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={props.img} style={{ objectFit: "cover", height: "270px" }}/>
            <Card.Body>
                <Card.Title>{props.price} kr.</Card.Title>
                <Card.Text>{props.title}</Card.Text>
            </Card.Body>
        </Card>
        </div>
    );
}
