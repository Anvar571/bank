export interface BaseUseCase<I, O> {
  exucate: (input: I) => Promise<O>;
}
