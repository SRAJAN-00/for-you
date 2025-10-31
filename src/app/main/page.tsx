import QuestionModal from "../../components/QuestionModal";

export const metadata = {
  title: "Main - Question",
};

export default function MainPage() {
  return (
    <div className="flex min-h-screen items-center bg-white justify-center p-6">
      <QuestionModal />
    </div>
  );
}
