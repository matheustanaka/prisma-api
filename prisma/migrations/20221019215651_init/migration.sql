-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
