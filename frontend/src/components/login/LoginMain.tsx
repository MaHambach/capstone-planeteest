
export default function LoginMain() {
    function login(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin;

        window.open(host + "/oauth2/authorization/github", "_self");
    }

    return (
        <main>
            <button onClick={login}>Login to GitHub</button>
        </main>
    );
}
