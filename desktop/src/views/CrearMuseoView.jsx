// Vista independiente: alta de museo.
import ViewLayout from '../components/ViewLayout.jsx'
import CreateMuseumForm from '../components/CreateMuseumForm.jsx'

export default function CrearMuseoView() {
  return (
    <ViewLayout titulo="Museos" subtitulo="Crear nuevo">
      <div className="max-w-2xl">
        <CreateMuseumForm />
      </div>
    </ViewLayout>
  )
}
