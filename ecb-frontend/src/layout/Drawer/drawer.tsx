import './drawer.scss'

interface DrawerProps {
  open: boolean,
  closeDrawer() : void
  children?: React.ReactNode
}

const Drawer = ({open, closeDrawer, children} : DrawerProps) : React.ReactElement => {
  return (
    <div className="side-drawer" data-open={open}>
      <div className="side-drawer-backdrop" onClick={closeDrawer} />
      <aside>
        {children}
      </aside>
    </div>
  )
}

export default Drawer
