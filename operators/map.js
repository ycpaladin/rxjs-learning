const { Observable } = require('../Observable')
/**
 * 
 * @param {(value: any, index: number)=> any} project 
 * @returns 
 */
module.exports = function (project) {
    /**
     * @param {Observable} source
     */
    return (source) => {
        const _new$ = source.life(
            /**
             * @this {{ next(value: any): void }}
             * @param {Observable} liftedSource
             */
            function (liftedSource) {
                liftedSource.subscribe(value => {
                    const nextValue = project(value);
                    this.next(nextValue)
                })
            }
        )
        return _new$;
    }
}
