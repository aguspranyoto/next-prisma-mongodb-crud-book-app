"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BookProps {
  title: string;
  date: string;
}

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [book, setBook] = useState<BookProps | undefined>(undefined);

  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  useEffect(() => {
    const getSingleBook = async () => {
      const response = await fetch(`/api/books/${bookId}`);
      const data = await response.json();
      setBook(data);
      setTitle(data.title);
      setDate(data.date);
    };
    if (bookId) getSingleBook();
  }, [bookId]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!title || !date) return alert("Please fill all fields");

    e.preventDefault();
    const response = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, date }),
    });

    if (response.ok) {
      alert("Book updated successfully");
      setTitle("");
      setDate("");
      router.push("/books");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full mx-auto max-w-4xl text-center">
      <h1 className="font-bold text-2xl mt-20">Edit Book Info of:</h1>
      {book ? (
        <>
          <p className="text-gray-900 leading-7">{book.title}</p>
          <p className="text-gray-900 leading-7">{book.date}</p>
        </>
      ) : (
        <p>loading...</p>
      )}
      <form onSubmit={handleEdit}>
        <div className="max-w-4xl mx-auto flex items-center bg-gray-100 p-3 rounded-lg gap-4 my-10">
          <label className="text-lg font-bold">Book Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-lg font-bold">Book Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button
            className="border p-2 rounded-lg bg-white hover:bg-white/40"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div>
        <Link href="/books">
          <button className="text-gray-900 underline hover:text-gray-900/70">
            Back to books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditPage;
