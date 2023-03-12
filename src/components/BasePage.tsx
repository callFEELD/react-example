import { Container } from "@mui/material";
import Navigation from "./Navigation";

export default function BasePage(params: any) {
    return(<>
        <Navigation />
        <Container fixed>
            <div style={{marginTop: 25}}></div>
            {params.children}
        </Container>
    </>)
}
