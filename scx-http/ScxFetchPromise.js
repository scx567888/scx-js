class ScxFetchPromise extends Promise {

    abortController;

    then(onfulfilled, onrejected) {
        const s = super.then(onfulfilled, onrejected);
        s.abortController = this.abortController;
        return s;
    }

    catch(onrejected) {
        const s = super.catch(onrejected);
        s.abortController = this.abortController;
        return s;
    }

    finally(onFinally) {
        const s = super.finally(onFinally);
        s.abortController = this.abortController;
        return s;
    }

    cancel(reason) {
        if (this.abortController) {
            this.abortController.abort(reason);
        }
    }

}

export {
    ScxFetchPromise,
};
