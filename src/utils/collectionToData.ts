import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

const docToData = (doc: QueryDocumentSnapshot<DocumentData>) => {
  return {
    id: doc.id,
    ...doc.data(),
  };
};

const collectionToData = (
  snap: QuerySnapshot<DocumentData> | undefined
): any[] => {
  if (!snap) return [];
  const boards: any[] = [];
  snap.forEach((doc) => {
    const board = docToData(doc);
    boards.push(board);
  });

  return boards;
};

export default collectionToData;
