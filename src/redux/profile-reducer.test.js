import { profileReducer } from "./profile-reducer";

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  
let newState = profileReducer({}, {})
    
