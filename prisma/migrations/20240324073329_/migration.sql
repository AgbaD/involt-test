-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "invoiceI" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "amountPaid" INTEGER NOT NULL,
    "amountCredited" INTEGER NOT NULL,
    "currencyRate" INTEGER NOT NULL,
    "isDiscounted" BOOLEAN NOT NULL,
    "hasAttachments" BOOLEAN NOT NULL,
    "hasErrors" BOOLEAN NOT NULL,
    "repeatingInvoiceID" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "lineAmountTypes" TEXT NOT NULL,
    "subTotal" DOUBLE PRECISION NOT NULL,
    "totalTax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "currencyCode" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");
