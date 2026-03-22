import React from "react";

const arms = [
  {
    id: 1,
    exercise: "Barbell Bicep Curl",
    imgUrl: "/images/barbell-bicep-curl.jpg",
    description:
      "Barbell bicep curls target the biceps brachii and are performed by curling a barbell towards the shoulders.",
  },
  {
    id: 2,
    exercise: "Dumbbell Hammer Curl",
    imgUrl: "/images/dumbbell-hammer-curl.jpg",
    description:
      "Dumbbell hammer curls target the biceps and forearms. They are performed by curling dumbbells with a neutral grip.",
  },
  {
    id: 3,
    exercise: "Tricep Pushdown",
    imgUrl: "/images/tricep-pushdown.jpg",
    description:
      "Tricep pushdowns target the triceps and are performed using a cable machine with a straight or angled bar attachment.",
  },
  {
    id: 4,
    exercise: "Skull Crushers",
    imgUrl: "/images/skull-crushers.jpg",
    description:
      "Skull crushers, also known as lying tricep extensions, target the triceps. They are performed by lowering a barbell or dumbbells towards the forehead.",
  },
  {
    id: 5,
    exercise: "Preacher Curls",
    imgUrl: "/images/preacher-curls.jpg",
    description:
      "Preacher curls target the biceps and are performed using a preacher bench with an EZ bar or dumbbells.",
  },
  {
    id: 6,
    exercise: "Tricep Dumbbell Kickbacks",
    imgUrl: "/images/tricep-dumbbell-kickbacks.jpg",
    description:
      "Tricep dumbbell kickbacks target the triceps and are performed by extending the arm back while holding a dumbbell.",
  },
];

const Arms = () => {
  return (
    <div>
      <div className="p-10">
        <p className="text-center m-6 text-2xl font-bold tracking-tight text-red-400 dark:text-white">
          Arms Exercises
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {arms?.map((exercise) => (
            <div
              key={exercise.id}
              className="max-w-sm bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="rounded-t-lg w-full object-contain"
                src={exercise.imgUrl}
                alt={exercise.exercise}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300x200.png?text=Image+Not+Found")}
              />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {exercise.exercise}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {exercise.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arms;