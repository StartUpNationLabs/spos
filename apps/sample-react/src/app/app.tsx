import {useQuery} from "@tanstack/react-query";
import {MenusApi} from "@spos/clients-menu";

const menusApi = new MenusApi(
)

export function App() {
  const query = useQuery({
    queryKey: ['menus'], queryFn: () => {
      return menusApi.menusControllerGetFullMenu()
    }
  })
  if (query.isLoading) {
    return <div>Loading...</div>
  }
  if (query.isError) {
    return <div>Error: {query.error}</div>
  }
  if (!query.data) {
    return <div>No data</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
}

export default App;
