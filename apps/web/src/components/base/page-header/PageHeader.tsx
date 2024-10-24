type Props = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight text-primary lg:text-5xl">
            {title}
          </h1>
          <p className="text-sm lg:text-base text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <hr className="my-8" />
    </>
  );
}
