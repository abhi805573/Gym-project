import React from "react";

const back = [
  {
    id: 1,
    exercise: "Deadlifts",
    imgUrl: "/images/deadlifts.jpg",
    description:
      "Deadlifts are a compound exercise targeting the lower back, glutes, hamstrings, and other muscles. They involve lifting a weight from the ground to a standing position.",
  },
  {
    id: 2,
    exercise: "Pull-ups",
    imgUrl: "/images/pull-ups.jpg",
    description:
      "Pull-ups target the latissimus dorsi and other muscles of the back. They are performed by pulling the body up towards a bar from a hanging position.",
  },
  {
    id: 3,
    exercise: "Bent Over Barbell Rows",
    imgUrl: "/images/bent-over-barbell-rows.jpg",
    description:
      "Bent over barbell rows target the upper and middle back muscles. They are performed by bending at the waist and pulling a barbell towards the lower chest.",
  },
  {
    id: 4,
    exercise: "Lat Pulldowns",
    imgUrl: "/images/lat-pulldowns.jpg",
    description:
      "Lat pulldowns target the latissimus dorsi and are performed using a cable machine with a wide-grip bar attachment.",
  },
  {
    id: 5,
    exercise: "T-Bar Rows",
    imgUrl: "/images/t-bar-rows.jpg",
    description:
      "T-bar rows target the middle and upper back muscles. They are performed by rowing a weighted bar attached to a pivot while bent over.",
  },
  {
    id: 6,
    exercise: "Single-Arm Dumbbell Rows",
    imgUrl: "/images/single-arm-dumbbell-rows.jpg",
    description:
      "Single-arm dumbbell rows target the latissimus dorsi and are performed by rowing a dumbbell towards the hip while supporting the body with the opposite arm and leg on a bench.",
  },
];

const Back = () => {
  return (
    <div>
      <div className="p-10">
        <p className="text-center m-6 text-2xl font-bold tracking-tight text-red-400 dark:text-white">
          Back Exercises
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {back?.map((exercise) => (
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

export default Back;