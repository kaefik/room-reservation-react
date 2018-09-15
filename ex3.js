const withProps = newProps => WrappedComponent => {
  const ModifiedComponent = (
    ownProps // модифицированная версия компонента
  ) => (
    <WrappedComponent {...ownProps} {...newProps} /> // исходные свойства + новые свойства
  );

  return ModifiedComponent;
};

const Details = ({ name, title, language }) => (
  <div>
    <h1>{title}</h1>
    <p>
      {name} works with {language}
    </p>
  </div>
);

const newProps = { name: "Alex" }; // это добавлено компонентом высшего порядка
const ModifiedDetails = withProps(newProps)(Details); // компонент высшего порядка каррирован для улучшения читабельности

const App = () => (
  <ModifiedDetails title="I'm here to stay" language="JavaScript" />
);
