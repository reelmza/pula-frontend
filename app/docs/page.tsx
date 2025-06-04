const Section = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="border w-full p-5 rounded-lg mb-5 lg:mb-2">
      <div className="text-lg lg:text-xl font-bold mb-1">{title}</div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center font-sans mt-10 lg:mt-20">
      {/* Heading */}
      <h1 className=" text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 font-extrabold tracking-tight mb-2">
        Documentation
      </h1>

      {/* Description */}
      <p className="w-full lg:w-[35%] px-5 text-sm text-gray-600 text-center mb-10">
        Find detailed guides about the working principles of the model below.
      </p>
      <div className="flex flex-col w-full px-5 lg:w-4/10 lg:gap-4">
        <Section
          title="Specifications"
          description="The model understands e-mails written in english language only and the model predicts the class of an e-mail based on factors such as grammatical accuracy, sentence form, use of punctuations, mispellings and length of e-mail."
        />

        <Section
          title="Limitations and Working"
          description="The project was built to attain as much accuracy as possible, however, false possitives and false negatives will be encountered occasionally due to the structure of the email provided and other factors such as language."
        />

        <Section
          title="About The Project"
          description="The project is a simple email classification model built on python and
        served to the frontend via NextJs, the webapp can be able to predict
        spam emails with a decent level of accuracy."
        />
        <Section
          title="About The Model"
          description="The model is trained with english data sets from kaggle, pyhhon modules such as nunmpy, pandas and sklearn were heavily utilised during the development of the model."
        />

        <div className="h-5"></div>

        <div className="text-center text-sm text-gray-600">
          Built By ELIJAH IKO-OJO IBRAHIM as a partial requirement for the award
          of Bachelors Degree in Cyber Security at Bingham University, Karu,
          Nasarawa State, Nigeria.{" "}
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Page;
