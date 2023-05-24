
import { useEffect, useState } from 'react';
import { InteractionType } from '@azure/msal-browser';
import { MsalAuthenticationTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from './auth.config';
import { httpClient } from './http-client';

function App({ instance }) {
  const [books, setBooks] = useState([]);
  const authRequest = {
    ...loginRequest,
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await httpClient.get('getBooks');
      setBooks(result.data);
    }

    fetchBooks();
  }, []);
  
  return (
    <MsalProvider instance={instance}>
      <MsalAuthenticationTemplate 
          interactionType={InteractionType.Redirect} 
          authenticationRequest={authRequest}
        >
          {
            books.map(book => (
              <div key={book.id}>
                <h1>{book.name}</h1>
              </div>
              )
            ) 
          }
        </MsalAuthenticationTemplate>
        <UnauthenticatedTemplate>
          You are not authenticated
        </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

export default App;
