const Menu = ({ active, setActive, setCategory }) => {
  const links = [
    { id: 1, name: "General", value: "news" },
    { id: 2, name: "Business", value: "economics" },
    { id: 4, name: "Finance", value: "finance" },
    { id: 5, name: "Science", value: "science" },
    { id: 6, name: "Sports", value: "sport" },
    { id: 7, name: "Technology", value: "tech" },
  ];

  const onClick = (id, value) => {
    setActive(id);
    setCategory(value);
  };

  return (
    <nav className="menu">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.id ? "active" : "inactive"}
            onClick={() => onClick(link.id, link.value)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
